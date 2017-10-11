let mongoose = require('mongoose');
let Recipe = require('../app/models').recipe;
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Recipes', () => {
    beforeEach((done) => {
        Recipe.remove({}, (err) => {
            done();
        });
    });

    it('should GET all the recipes', (done) => {
        let recipe = new Recipe({
            name: 'Some Recipe',
            ingredients: ['1 x ingredient A, 2 x ingredient B'],
            description: 'A really great meal.'
        });
        recipe.save();

        chai.request(app)
            .get('/recipes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('should POST new recipes', (done) => {
        let recipe = new Recipe({
            name: 'Some Recipe',
            ingredients: ['1 x ingredient A, 2 x ingredient B'],
            description: 'A really great meal.'
        });

        chai.request(app)
            .post('/recipes')
            .send(recipe)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Recipe successfully saved!');
                res.body.recipe.should.have.property('name');
                res.body.recipe.should.have.property('ingredients');
                res.body.recipe.should.have.property('description');
                done();
            });
    });

    it('should /GET/:id a single recipe', (done) => {
        let recipe = new Recipe({
            name: 'Some Recipe',
            slug: 'some-recipe',
            ingredients: ['1 x ingredient A, 2 x ingredient B'],
            description: 'A really great meal.'
        });
        recipe.save((err, recipe) => {
            chai.request(app)
                .get('/recipes/' + recipe.slug)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('ingredients');
                    res.body.should.have.property('description');
                    res.body.should.have.property('_id').eql(recipe.id);
                    done();
                });
        });
    });

    it('should /PUT/:id recipe', (done) => {
        let recipe = new Recipe({
            name: 'Some Recipe',
            slug: 'some-recipe',
            ingredients: ['1 x ingredient A, 2 x ingredient B'],
            description: 'A really great meal.'
        });
        recipe.save((err, recipe) => {
            chai.request(app)
                .put('/recipes/' + recipe.slug)
                .send({ description: 'changed' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.recipe.should.have.property('description').eql('changed');
                    done();
                });
        });
    });

    it('should /DELETE/:id recipe', (done) => {
        let recipe = new Recipe({
            name: 'Some Recipe',
            slug: 'some-recipe',
            ingredients: ['1 x ingredient A, 2 x ingredient B'],
            description: 'A really great meal.'
        });
        recipe.save((err, recipe) => {
            chai.request(app)
                .delete('/recipes/' + recipe.slug)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Recipe successfully deleted!');
                    done();
                });
        });
    });
});
