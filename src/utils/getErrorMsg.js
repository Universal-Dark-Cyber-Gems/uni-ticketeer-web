export default function getErrorMsg(response){
    let errormsg = response.error?.response?.data?.data 
                        ? 
                        response.error?.response?.data?.data[0]?.message
                        :
                        response.error?.response?.data
                        ?
                        response.error?.response?.data?.message
                        :
                        response.error?.message

    return errormsg
}