export default class CustomerApiErrorException extends Error {
    constructor(message:"somthing went wrong"){
        super(message)
        this.name='CustomerApiErrorException'

    }
}