export const url = 'http://localhost:9000'

//export const url = 'http://10.160.0.67:9000'


let newURL = ''
export const setUrl = (data:string) => {
        newURL = data
}

export function getUrl() {
    return newURL
}