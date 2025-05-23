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


// export async function createEditCabin(newCabin, id){
//     console.log(newCabin, id);
    

//     const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//     const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

//     const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/
//     cabins-image/${imageName}`;
    
//     // https://cewpohjcjinpewggeqxh.supabase.co/storage/v1/object/public/cabins-image//cabin-006.jpg
    
//     //1. Create/edit cabin
//     let query = supabase.from("cabins");

//     // A) CREATE
//     if (!id) query = query.insert([{...newCabin, image: imagePath}]);


//     //.select .single is to immediately  return the row in the database cos intially the return data will be empty.
//         //  .select()
//         //  .single();

//     // B) EDIT
//     if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id)

//     const {data, error} = await query.select().single();

//     // const {data, error} = await supabase.from("cabins").insert([{...newCabin, image: imagePath}]).select().single();

//     if (error) {
//         console.error(error);
//         throw new Error('Cabin could not be created')   
//     }

//     //2. Upload image

//     const {error: storageError} = await supabase.storage.from('cabins-image').upload(imageName, newCabin.image);


//     //3. Delete cabin if there was an error uploading the corresponding image

//     if(storageError) {
//         await supabase.from('cabins').delete().eq("id", data.id);
//         console.error(storageError);
//         throw new Error('Cabin image could not be uploaded and the cabin was not created.');   
        
//     }


//     return data;
// }


export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins-image")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
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













// export async function createEditCabin(newCabin, id){
//     console.log(newCabin, id);
    

//     const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//     const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

//     const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/
//     cabins-image/${imageName}`;
    
//     // https://cewpohjcjinpewggeqxh.supabase.co/storage/v1/object/public/cabins-image//cabin-006.jpg
    
//     //1. Create/edit cabin
//     let query = supabase.from("cabins");

//     // A) CREATE
//     if (!id) query = query.insert([{...newCabin, image: imagePath}]);


//     //.select .single is to immediately  return the row in the database cos intially the return data will be empty.
//         //  .select()
//         //  .single();

//     // B) EDIT
//     if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

//     const {data, error} = await query.select().single();

//     // const {data, error} = await supabase.from("cabins").insert([{...newCabin, image: imagePath}]).select().single();

//     if (error) {
//         console.error(error);
//         throw new Error('Cabin could not be created')   
//     }

//     //2. Upload image

//     const {error: storageError} = await supabase.storage.from('cabins-image').upload(imageName, newCabin.image);


//     //3. Delete cabin if there was an error uploading the corresponding image

//     if(storageError) {
//         await supabase.from('cabins').delete().eq("id", data.id);
//         console.error(storageError);
//         throw new Error('Cabin image could not be uploaded and the cabin was not created.'
//    );      
//   }


//     return data;
// }