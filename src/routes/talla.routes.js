import { Router } from 'express';
import { marcas } from './marca.routes.js';

const router = Router();

let tallas = []; // Aquí se almacenan las tallas con los IDs de marca

router.get('/talla', (req, res) => {
    // Mapear IDs de marcas a sus nombres
    const marcasMap = new Map(marcas.map(marca => [marca.id, marca.nombre]));
    
    // Mapear tallas con nombres de marcas
    const tallasConNombres = tallas.map(talla => ({
        ...talla,
        marca: marcasMap.get(talla.marca) || 'Desconocida'
    }));

    res.render('almacen/talla', { tallas: tallasConNombres, marcas, mensaje: req.query.mensaje });
});

router.post('/talla', (req, res) => {
    const { medidaTalla, marcaTalla } = req.body;
    const newTalla = {
        id: tallas.length + 1,
        medida: medidaTalla,
        marca: parseInt(marcaTalla) // Asegúrate de almacenar el ID de la marca
    };
    tallas.push(newTalla);
    res.redirect('/talla?mensaje=Talla de zapatilla agregada correctamente');
});

router.get('/talla/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tallas = tallas.filter(talla => talla.id !== id);
    res.redirect('/talla?mensaje=Talla eliminada correctamente');
});

router.post('/talla/editar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { medidaTalla, marcaTalla } = req.body;
    const talla = tallas.find(talla => talla.id === id);
    if (talla) {
        talla.medida = medidaTalla;
        talla.marca = parseInt(marcaTalla); // Asegúrate de actualizar el ID de la marca
        res.redirect('/talla?mensaje=Talla actualizada correctamente');
    } else {
        res.redirect('/talla?mensaje=Talla de zapatilla no encontrada');
    }
});

export default router;
