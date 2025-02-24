export async function fetchCurrentIndex(): Promise<number> {
    try{
        const apiURL = process.env.REACT_APP_BACKEND_URL
        const response = await fetch(`${apiURL}/current-index`)
        const data = await response.json()
        return data.index
    } catch (error) {
        console.error('Error fetching current video index: ', error)
        return 0;
    }
}