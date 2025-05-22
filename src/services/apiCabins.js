import supabase, {supabaseUrl} from "./supabase";

export async function getCabins() {
    const {data, error} = await supabase.from('cabins').select('*')

    if(error) {
        console.error(error);
        console.log(error);
        
        throw new Error('Cabins could not be loaded')
        
    }

    return data;
    
}


export async function createCabin(newCabin){

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;
    
    // https://cewpohjcjinpewggeqxh.supabase.co/storage/v1/object/public/cabins-image//cabin-006.jpg
    
    //1. Create cabin


    const {data, error} = await supabase.from("cabins").insert([{...newCabin, image: imagePath}])

    if (error) {
        console.log(error);
        throw new Error('Cabin could not be created')   
    }

    //2. Upload image
    const {error: storageError} = await supabase.storage.from('cabins-image').upload(imageName, newCabin.image)


    //3. Delete cabin if there was an error uploading the corresponding image

    if(storageError) {
        await supabase.from('cabins').delete().eq("id", data.id)

        if (error) {
        console.error(storageError);
        throw new Error('Cabin image could not be uploaded and the cabin was not created.')   
    }
    }


    return data;
}



export async function deleteCabin(id){
    const {data, error} = await supabase.from('cabins').delete().eq("id", id)

    if(error) {
        throw new Error('Cabins could not be delete')
    }

    return data;
}

