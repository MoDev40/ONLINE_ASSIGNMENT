import axios from "axios"
export async function download(url:string,exe:string) : Promise<void> {
    const res = await axios({
        url,
        method: 'GET',
        responseType: 'blob',
    })

    const fileUrl = window.URL.createObjectURL(new Blob([res.data]))

    const link = document.createElement('a')
    link.setAttribute('download',exe)

    link.href = fileUrl
    document.body.appendChild(link)
    link.click()
    
    document.body.removeChild(link)
    window.URL.revokeObjectURL(fileUrl)
    
}