import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

import { writable } from 'svelte/store';

// Initialises the database
export const db = GUN();
// User stays logged in 
export const user = db.user().recall({sessionStorage: true});

// allows this variable to be used throughout the application
export const username = writable('');
// Whenever the alias updates, the username variable gets updated
user.get('alias').on(v => username.set(v))

// When the user signs in or signs out
db.on('auth', async(event) => {
    const alias = await user.get('alias');
    username.set(alias);

    console.log(`signed in as ${alias}`);
});