const {
    default: axios
} = require("axios");
const res = require("express/lib/response");

exports.loginPdg = (req, rese) => {
    axios.post('http://localhost:3000/api/pdg/login', {

            "email_pdg": req.body.email_pdg,
            "password_pdg": req.body.password_pdg
        })
        .then((res) => {
            if (res.data.success == 0) {
                res.render('login');
            } else {
                rese.redirect('/pdgDash')
            }
        })
        .catch(err => (console.log(err)));

}

exports.getDataToPdg = (req, resu) => {
    axios.get('http://localhost:3000/api/pdg/statistics')
        .then((res) => {
            axios.get('http://localhost:3000/api/pdg/promos')
                .then(res2 => (console.log(res, ), resu.render('pdg/pdgm', {
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
        .then(res => (rese.redirect('pdg/gestion_account')))
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
        .then(res => (rese.redirect('pdg/gestion_account')))
        .catch(err => (console.log(err)));
}