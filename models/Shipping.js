const mongoose = require("mongoose")

const ShippingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    payment: {
        method: {
            type: String,
            enum: ['paypal'],
            required: true
        },
        paypalEmail: {
            type: String,
            required: function () {
                return this.payment.method === 'paypal';
            }
        }
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Shipping", ShippingSchema)