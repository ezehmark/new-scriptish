

const {Router} = require('express');

const { authMiddleware } = require('../middleware/auth');
const {fetchAllPatients} = require('../services/patientService')

const router = Router();

router.get('/',authMiddleware, async(req,res)=>{
    console.log('Fetching clinic related patients using clinic id:',req.query)
    try{
        const clinicId = req.query.clinicId;
        if (!clinicId) {
            return res.status(400).json({ error: 'clinicId query parameter is required' });
        }
        const result = await fetchAllPatients(clinicId);
        res.json(result)
    }
    catch(err){
        console.log('Error fetching patients:',err)
        res.status(500).json({ error: err.message })
    }
} )

module.exports = router