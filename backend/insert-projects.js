// insert-projects.js
import knex from './db/knex.js'; // adjust path to your knex instance

async function insertProjects() {
  await knex('project').insert([
    {
      job_id: 'JOB001',
      job_title: 'Frontend Developer',
      job_description: 'Develop and maintain user interfaces'
    },
    {
      job_id: 'JOB002',
      job_title: 'Backend Developer',
      job_description: 'Develop APIs and manage database operations'
    },
    {
      job_id: 'JOB003',
      job_title: 'Full Stack Developer',
      job_description: 'Work on both frontend and backend tasks'
    }
  ]);
  console.log('Projects inserted successfully!');
  process.exit(0);
}

insertProjects();
