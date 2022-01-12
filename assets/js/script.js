
function selectProduit(){
    document.getElementById('remise').value=""
        if(document.getElementById('rayon').value==1){
            document.getElementById('remise').setAttribute("max", "20");
        }else{
            document.getElementById('remise').setAttribute("max", "50");
        }
        axios.get('http://localhost:3000/api/admin/listeProduit/'+document.getElementById('category').value)
        .then((res)=>{
            axios.get('http://localhost:3000/api/admin/getChefByCategorie/'+document.getElementById('category').value)
            .then((res1)=>{
            document.getElementById('produit').innerHTML="<option hidden selected></option>";
            for(var i = 0 ;i<res.data.data.length;i++){
                document.getElementById('produit').innerHTML+='<option value="'+res.data.data[i].id_prod+'">'+res.data.data[i].nom_prod+'</option>'
            }
            document.getElementById('rayon').innerHTML="<option hidden selected></option>";
            for(var i = 0 ;i<res1.data.data.length;i++){
                document.getElementById('rayon').innerHTML+='<option value="'+res1.data.data[i].id_admin_rayon+'">'+res1.data.data[i].nom_admin_rayon+'</option>'
            }
        })
        .catch(err1=>(console.log(err1)));
        })
        .catch(err2=>(console.log(err2)));

}