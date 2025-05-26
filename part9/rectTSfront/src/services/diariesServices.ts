import { NewDiary } from "../types/types"

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


const createNewDiary = async (newElement: NewDiary) =>   {
    // TODO add logic 
    try {
        const dataToBE = await fetch("http://localhost:3005/api/diaries", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newElement)
        })

        // verificar response.ok de dataToBE, como mejora 

        const content = await dataToBE.json()
        
        console.log(content, "content POST fecth ")
    } catch (error) {
        console.error(error)
    }
}


export {
    fetchDiaries,
    createNewDiary
}

