const fetchDiaries = async () => {
    try {

        const diaries = await fetch("http://localhost:3005/api/diaries")

        // check response in case we get it back 
        const dataDiaries = await diaries.json()
        return dataDiaries

    } catch (error: unknown) {
        console.error("Error al obtener los diarios:", error)
        return {
            success: false,
            message: error instanceof Error ? error.message : "Error desconocido",
        }
    }
}


const createNewDiary = () =>   {
    // TODO add logic 
}


export {
    fetchDiaries
}

