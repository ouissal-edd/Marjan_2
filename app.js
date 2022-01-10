const express = require('express');
const app = express();

const router = require('./router/router');
const bodyParser = require('body-parser');

const session = require('express-session');
const cookieParser = require('cookie-parser')



// static files
app.use(express.static('assets'));
app.use('/css', express.static(__dirname + 'assets/css'));
app.use('/js', express.static(__dirname + 'assets/js'));
app.use('/images', express.static(__dirname + 'assets/images'));

// Set views
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));


// to get views 
app.get('/pdg', function (req, res) {
    res.render('pdg/login');
});

app.get('/g_account', function (req, res) {
    res.redirect('/getCenter');
});
app.get('/admin', function (req, res) {
    res.render('admin/dashAdmin');
});
app.get('/admin/login', function (req, res) {
    res.render('admin/logiin');
});

app.get('/g_account_admin', function (req, res) {
    res.redirect('/getChef');
});
// app.get('/g_prom', function (req, res) {
//     res.redirect('admin/gestion_account');
// });






// action
//pdg
app.post('/loginPdg', router.loginPdg);
app.get('/pdgDash', router.getDataToPdg);
app.post('/addCenterAdmin', router.addAdminCentre);
app.get('/getCenter', router.getCenter);
app.post('/deletePromo/:id', router.deletePromotion);
app.post('/addCategorie', router.addCategorie);

// admin
app.post('/loginAdmin', router.loginAdmin);
app.get('/getChef', router.getChefRayon);
app.post('/addPromotion', router.addPromotion);
app.post('/addChefR', router.addChefRayon);







app.listen(4000, () => console.log('started on port ', 4000));