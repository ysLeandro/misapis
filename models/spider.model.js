import mongoose from "mongoose";

const spiderSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    universo: {
        type: String,
        required: true 
    },
    alias: {
        type: String,
        required: false 
    },
    habilidades: {
        type: [String],
        required: false 
    },
    origen: {
        type: String,
        required: false 
    },
    añoAparicion: {
        type: Number,
        required: false 
    },
    imagen: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: false
    }
});

const Spider = mongoose.model('Spider', spiderSchema);

export default Spider;