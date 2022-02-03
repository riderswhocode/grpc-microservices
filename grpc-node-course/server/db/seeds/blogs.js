
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('blogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([
        {author: 'Stephane', title: 'Stephs Blog Title', content: 'First Blog Content'},
        {author: 'Paulo', title: 'Paulos Blog Title', content: 'First Blog Content'},
        {author: 'James', title: 'James Blog Title', content: 'First Blog Content'}
      ]);
    });
};
