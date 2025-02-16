/*const {neon} = require('@neondatabase/serverless');
const {drizzle} = require('drizzle-orm/neon-http');
const dotenv = require('dotenv');*/
import {neon} from '@neondatabase/serverless';
import {drizzle} from 'drizzle-orm/neon-http';
import dotenv from 'dotenv';

dotenv.config();


const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);


export default db;