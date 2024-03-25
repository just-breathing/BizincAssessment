const {Blogpool:pool} = require("./dbconnectionPool");
const {generateHash}=require("../Utils/passwordHash")

// get usernames data
const createUser = async (email,password,full_name,bio) => {
    const hashedpwd= await generateHash(password);
    const client = await pool.connect();
    try {
        const query = `
        INSERT INTO Users (email, password, full_name, bio)
        VALUES ($1,$2,$3,$4)  RETURNING *  `;
    
      const result = await client.query(query, [email,hashedpwd,full_name,bio]);
      return result.rows;
    } finally {
      client.release(); 
    }
  };

// get usernames data
const getUsersdata = async () => {
    const client = await pool.connect();
    try {
        const query = `
        SELECT email,bio,full_name from Users 
    `;
    
      const result = await client.query(query, []);
      return result.rows;
    } finally {
      client.release(); 
    }
  };

// get all posts and count of comments on each post by using full name
const getAllPostsAndCommentsCountByUsername = async (name) => {
    const client = await pool.connect();
    try {
        const query = `
        SELECT 
            p.post_id,
            p.title,
            p.content,
            p.created_at,
            p.updated_at,
            COUNT(c.comment_id) AS comment_count
        FROM 
            Posts p
        INNER JOIN Users u ON u.user_id = p.user_id
        LEFT JOIN Comments c ON c.post_id = p.post_id
        WHERE 
            u.full_name = $1
        GROUP BY 
            p.post_id;
    `;
    
      const result = await client.query(query, [name]);
      return result.rows;
    } finally {
      client.release(); // Release the client back to the pool
    }
  };

  // get all posts by using full name
const getAllPostsByUsername = async (name) => {
    const client = await pool.connect();
    try {
        const query = `
        SELECT 
            p.post_id,
            u.full_name, 
            p.title,
            p.content,
            p.created_at,
            p.updated_at
        FROM 
            Posts p
        INNER JOIN Users u ON u.user_id = p.user_id
        WHERE 
            u.full_name = $1
    `;
    
      const result = await client.query(query, [name]);
      return result.rows;
    } finally {
      client.release(); 
    }
  };


  // get comments count on a post using title of blog  post
  const getCommentsCountOnAPost = async (title) => {
    const client = await pool.connect();
    try {
        const query = `
        SELECT 
            p.post_id,
            p.title,
            p.content,
            p.created_at,
            p.updated_at,
            COUNT(c.comment_id) AS comment_count
        FROM 
            Posts p
        LEFT JOIN Comments c ON c.post_id = p.post_id
        WHERE 
            p.title = $1
        GROUP BY 
            p.post_id;
    `;
    
      const result = await client.query(query, [title]);
      return result.rows;
    } finally {
      client.release(); 
    }
  };

  module.exports = {createUser,getUsersdata, getAllPostsAndCommentsCountByUsername,getAllPostsByUsername,getCommentsCountOnAPost };
