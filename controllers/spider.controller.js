import Spider from '../models/spider.model.js';
import mongoose from "mongoose";
import express from 'express';

export const getAllSpiders = async (req, res) => {
    console.log('GET TODOS LOS SPIDERS');
    try {
        const spiders = await Spider.find({}, { __v: 0 });
        if (spiders.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron spiders' });
        }
        return res.status(200).json({ spiders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener los spiders' });
    }
};

export const getSpiderById = async (req, res) => {
    console.log('GET SPIDER POR ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no válido' });
        }

        const spider = await Spider.findById(id);
        if (!spider) {
            return res.status(404).json({ msg: 'Spider no encontrado' });
        }

        return res.status(200).json({ spider });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener el spider' });
    }
};

export const postSpider = async (req, res) => {
    console.log('POST SPIDER');
    const body = req.body;
    const spider = new Spider(body);

    try {
        const validationError = spider.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(err => err.message);
            return res.status(400).json({ error: errorMessages });
        }

        await spider.save();
        return res.status(201).json({ spider });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al guardar el spider' });
    }
};

export const putSpider = async (req, res) => {
    console.log('PUT SPIDER');
    const id = req.params.id;
    const body = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no válido' });
        }

        const spider = await Spider.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!spider) {
            return res.status(404).json({ msg: 'Spider no encontrado' });
        }

        return res.status(200).json({ spider });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al actualizar el spider' });
    }
};

export const deleteSpider = async (req, res) => {
    console.log('DELETE SPIDER');
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no válido' });
        }

        const spider = await Spider.findByIdAndDelete(id);
        if (!spider) {
            return res.status(404).json({ msg: 'Spider no encontrado' });
        }

        return res.status(200).json({ msg: 'Spider eliminado', spider });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al eliminar el spider' });
    }
};