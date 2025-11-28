//export const url = 'http://localhost:9000'

export const url = 'http://10.160.10.141:9000'


let newURL = ''
export const setUrl = (data:string) => {
        newURL = data
}

export function getUrl() {
    return newURL
}

export function checkUrl(){
    if(newURL !== ''){
        return newURL
    }else{
        return url
    }
}