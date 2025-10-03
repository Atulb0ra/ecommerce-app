// import { currency } from "../../admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

// global variables
const currency = 'inr'
const deliveryCharge = 10


// Initialize gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order using cod Method

const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,items, amount,address,
            paymentMethod : "COD",
            payment:false,
            date : Date.now()
        }
        const newOrder = new orderModel(orderData)
        newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData : {}})
        res.json({success: true, message : "Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// placing order using Stripe Method

const placeOrderStripe = async(req, res) =>{
    try {
        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,items, amount,address,
            paymentMethod : "Stripe",
            payment:false,
            date : Date.now()
        }

        const newOrder = new orderModel(orderData)
        newOrder.save()

        const line_items = items.map((item) => ({
            price_data : {
                currency : currency,
                product_data : {
                    name : item.name
                },
                unit_amount : item.price*100
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency : currency,
                product_data : {
                    name : 'Delivery Charges'
                },
                unit_amount : deliveryCharge * 100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({success: true, session_url : session.url});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// verify Stripe
const verifyStripe = async(req,res) =>{
    const {userId, success, orderId} = req.body

    try {
        // Validate required fields
        if (!userId) {
            return res.json({success: false, message: "User ID is required"});
        }
        if (!orderId) {
            return res.json({success: false, message: "Order ID is required"});
        }
        if (success === undefined) {
            return res.json({success: false, message: "Success status is required"});
        }

        console.log(`Verifying Stripe payment for user ${userId}, order ${orderId}, success: ${success}`);

        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData : {}})
            console.log(`Payment verified successfully for order ${orderId}`);
            res.json({success:true});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            console.log(`Payment failed, order ${orderId} deleted`);
            res.json({success:false});
        }
    } catch (error) {
        console.log("Error in verifyStripe:", error);
        res.json({success:false, message:error.message});
    }
}

// placing order using razorpay Method

// const placeOrderRazorpay = async(req, res) =>{ 
// }

// All Orders data for admin panel
const allOrders = async(req, res)  =>{
    try {
        const orders = await orderModel.find({});
        res.json({success : true, orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// user Order Data for frontend
const userOrders = async(req, res) =>{
    try {
        
        const {userId} = req.body;
        const orders = await(orderModel.find({userId}))
        res.json({success:true, orders});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}


// update order status from admin panel
const updateStatus = async(req, res) =>{
    try {
        
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})

        res.json({success:true, message:"status updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe}