const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}




// const asyncHandler = () => {}
    // func k ander fun as variable pass kiya h
    // const asyncHandler = (func) => () =>{}
    // const asyncHandler = (func) => async () => {}
        // 2nd way
// const asyncHandler = (fn) => async(req,res,next) => {
//     try{
//         await fn(req,res,next)
//     }
//     catch(error){
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

export {asyncHandler}