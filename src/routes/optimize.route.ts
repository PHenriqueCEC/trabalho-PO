import {Request, Response, Router} from 'express';


const router = Router();

// interface ResponseI {
//     solution : Array<Number>,
// }


router.post('/optimize' , async (req : Request, res : Response)  => {
    return res.status(200).json({

    })
})

export default router;