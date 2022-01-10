const {
    default: axios
} = require("axios");
const res = require("express/lib/response");

exports.loginPdg = (req, rese) => {
    axios.post('http://localhost:3000/api/pdg/login', {

            "email_pdg": req.body.email_pdg,
            "password_pdg": req.body.password_pdg
        })
        .then((res3) => {
            if (res3.data.success == 0) {
                rese.render('pdg/login');
            } else {
                axios.get('http://localhost:3000/api/pdg/statistics')
                    .then((res1) => {
                        axios.get('http://localhost:3000/api/pdg/promos')

                            .then(res2 => (console.log(res3.data.pdg), rese.render('pdg/pdgm', {
                                statestics: res1.data,
                                allPromo: res2.data.data,
                                Jwt: res3.data.token,
                                numCenter: res3.data.pdg,
                            })))


                            .catch(err2 => (console.log(err2)));
                    })
                    .catch(err => (console.log(err)))
            }
        })
        .catch(err => (console.log(err)));

},
exports.loginAdmin = (req, rese) => {
    axios.post('http://localhost:3000/api/admin/loginAdmin', {

        "email_admin": req.body.email_admin,
        "password_admin": req.body.password_admin
        })
        .then((res3) => {
            if (res3.data.success == 0) {
                rese.render('admin/logiin');
            } else {
                axios.get('http://localhost:3000/api/admin/product')
                    .then((res1) => {
                        axios.post('http://localhost:3000/api/admin/getPromoByCenter',{"centre":res3.data.admin})
                        .then((res6) => {
                        axios.post('http://localhost:3000/api/admin/getAdminRayon',{"centre":res3.data.admin})
                            .then(res2 => ( rese.render('admin/dashAdmin', {
                                products: res1.data.data,
                                adminRayon: res2.data.data,
                                Jwt: res3.data.token,
                                promo: res6.data.data,
                                num_centre:res3.data.admin
                            })))


                            .catch(err2 => (console.log(err2)));
                })
                .catch(err6 => (console.log(err6)))
                    })
                    .catch(err1 => (console.log(err1)))
            }
        })
        .catch(err => (console.log(err)));

}

// exports.loginAdmin = (req, rese) => {
//     axios.post('http://localhost:3000/api/admin/loginAdmin', {

//             "email_admin": req.body.email_admin,
//             "password_admin": req.body.password_admin
//         })
//         .then((res) => {
//             if (res.data.success == 0) {
//                 rese.render('admin/logiin');
//             } else {
//                 rese.redirect('/getData')
//             }
//         })
//         .catch(err => (console.log(err)));

// }

exports.getCenter = (req, resu) => {
    axios.get('http://localhost:3000/api/pdg/centre')
        .then((res) => {
            axios.get('http://localhost:3000/api/pdg/centrAdmin')
                .then(res2 => ( resu.render('pdg/gestion_account', {
                    center: res.data.data,
                    adminCentre: res2.data.data
                })))
                .catch(err2 => (console.log(err2)));
        })
        .catch(err => (console.log(err)))
  

}

exports.getChefRayon = (req, resu) => {
    const cc= req.body.centree;
    axios.get('http://localhost:3000/api/admin/category')
    .then((res) => {
    axios.post('http://localhost:3000/api/admin/getAdminRayon',{"centre":1})
                .then(res2 => ( resu.render('admin/gestion_account', {
                  adminRayon: res2.data.data,
                  categorie: res.data.data,

                })))
                .catch(err2 => (console.log(err2)));
            })
            .catch(err => (console.log(err)))
}
exports.addChefRayon = (req, rese) => {

    axios.post('http://localhost:3000/api/admin/rayonUser', {

            "nom_admin_rayon": req.body.nom_admin_rayon,
            "email_admin_rayon": req.body.email_admin_rayon,
            "password_admin_rayon": req.body.password_admin_rayon,
            "fk_centre": req.body.center,
            "fk_cat":req.body.categorie,

        })
        .then(res => (rese.redirect('/getChef')))
        .catch(err => (console.log(err)));
}



// exports.getData = (req, resu) => {

//     axios.get('http://localhost:3000/api/admin/product')
//         .then((res) => {
//             axios.post('http://localhost:3000/api/admin/getAdminRayon', {
//                     "centre": 1,

//                 })
//                 .then(res2 => (resu.render('admin/dashAdmin', {
//                     products: res.data.data,
//                     adminRayon: res2.data.data,
//                 })))


//                 .catch(err2 => (console.log(err2)));
//         })
//         .catch(err => (console.log(err)))

// }


exports.getDataToPdg = (req, resu) => {
    axios.get('http://localhost:3000/api/pdg/statistics')
        .then((res) => {
            axios.get('http://localhost:3000/api/pdg/promos')
                .then(res2 => (resu.render('pdg/pdgm', {
                    statestics: res.data,
                    allPromo: res2.data.data
                })))


                .catch(err2 => (console.log(err2)));
        })
        .catch(err => (console.log(err)))
}

exports.addAdminCentre = (req, rese) => {

    axios.post('http://localhost:3000/api/pdg/create', {

            "nom_admin": req.body.nom_admin,
            "email_admin": req.body.email_admin,
            "password_admin": req.body.password_admin,
            "fkcentre": req.body.center

        })
        .then(res => (rese.render('pdg/gestion_account')))
        .catch(err => (console.log(err)));
}
exports.deletePromotion = (req, resu) => {
    axios.delete('http://localhost:3000/api/pdg/delprom/' + req.params.id)
        .then(res => (resu.redirect('/pdgDash')))
        .catch(err => (console.log(err)));
}
exports.addCategorie = (req, rese) => {

    axios.post('http://localhost:3000/api/pdg/createCategorie', {
            "type_cat": req.body.type_cat,
        })
        .then(res => (rese.render('pdg/gestion_account')))
        .catch(err => (console.log(err)));
}

exports.addPromotion = (req, rese) => {
    axios.post('http://localhost:3000/api/admin/promo', {

            "date_debut": req.body.date_debut,
            "date_fin": req.body.date_fin,
            "fk_rayon": req.body.fk_rayon,
            "fk_prod": req.body.prooduit,
            "remise": req.body.remise,
            "fk_admin": req.body.fk_admin,

        })
        .then((res) => {
            if (res.data.success == 0) {
                res.render('login');
            } else {
                rese.redirect('/getData')
            }
        })
        .catch(err => (console.log(err)));

}