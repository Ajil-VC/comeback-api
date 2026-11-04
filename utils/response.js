

exports.success = (res, data = null, message = "OK", status = 200)=>{
    res.status(status).json({success : true, message, data, error : null});
}

exports.fail = (res, message = 'Something went wrong.', status = 500, code = 'INTERNAL_ERROR', details = null)=>{
    res.status(status).json({success : false, message, data : null, error: {code, details}})
}