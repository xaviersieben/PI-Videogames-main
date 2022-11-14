import React from "react";



export default function GenreSelectOption({allGenres}){
    
return(
    // <select>
    //     <option>Genres</option>
    //     <option value="All">All</option>
    <>
        {
            allGenres?.map(e =>{
                return(
                    <option key={e.id} value={e.name} >
                    
                        {
                            e.name
                        }
                    </option>
                )
            })
        }
    </>
    // </select>
)

}
