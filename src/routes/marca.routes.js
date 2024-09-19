import { Router } from 'express'

const router = Router();

export let marcas = []; 

router.get('/marca', (req, res) => {
    res.render('almacen/marca', { marcas, mensaje: req.query.mensaje });
});

router.post('/marca', (req, res) => {
    const { nombreMarca } = req.body;
    const newMarca = {
        id: marcas.length + 1,
        nombre: nombreMarca
    };
    marcas.push(newMarca);
    res.redirect('/marca?mensaje=Marca agregada correctamente');
});

router.get('/marca/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    marcas = marcas.filter(cat => cat.id !== id);
    res.redirect('/marca?mensaje=Marca eliminada correctamente');
});

router.post('/marca/editar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombreMarca } = req.body;
    const marca = marcas.find(cat => cat.id === id);
    if (marca) {
        marca.nombre = nombreMarca;
        res.redirect('/marca?mensaje=Marca actualizada correctamente');
    } else {
        res.redirect('/marca?mensaje=Marca no encontrada');
    }
});

export default router;