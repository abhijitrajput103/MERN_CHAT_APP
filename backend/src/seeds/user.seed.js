import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
    // Female Users (Indian Actresses)
    {
        email: "deepika.padukone@example.com",
        fullname: "Deepika Padukone",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/3/30/DeepikaPadukone.jpg",
    },
    {
        email: "alia.bhatt@example.com",
        fullname: "Alia Bhatt",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/4/45/Alia_Bhatt_2019.jpg",
    },
    {
        email: "kiara.advani@example.com",
        fullname: "Kiara Advani",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/4/48/Kiara_Advani_promoting_Kabir_Singh.jpg",
    },
    {
        email: "kriti.sanon@example.com",
        fullname: "Kriti Sanon",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/3/32/Kriti_Sanon_at_Bareilly_Ki_Barfi_screening.jpg",
    },
    {
        email: "shraddha.kapoor@example.com",
        fullname: "Shraddha Kapoor",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Shraddha_Kapoor_promoting_Haider.jpg",
    },
    {
        email: "ananya.panday@example.com",
        fullname: "Ananya Panday",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Ananya_Panday_promoting_Pati_Patni_Aur_Woh.jpg",
    },
    {
        email: "rashmika.mandanna@example.com",
        fullname: "Rashmika Mandanna",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Rashmika_Mandanna_2019.jpg",
    },
    {
        email: "samantha.ruth@example.com",
        fullname: "Samantha Ruth Prabhu",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Samantha_Ruth_Prabhu_at_Abhimanyudu_Audio_Launch.jpg",
    },

    // Male Users (Indian Cricketers)
    {
        email: "virat.kohli@example.com",
        fullname: "Virat Kohli",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Virat_Kohli_in_2023.jpg",
    },
    {
        email: "rohit.sharma@example.com",
        fullname: "Rohit Sharma",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Rohit_Sharma_2023.jpg",
    },
    {
        email: "kl.rahul@example.com",
        fullname: "KL Rahul",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/5/55/KL_Rahul_2023.jpg",
    },
    {
        email: "shubman.gill@example.com",
        fullname: "Shubman Gill",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Shubman_Gill_2023.jpg",
    },
    {
        email: "hardik.pandya@example.com",
        fullname: "Hardik Pandya",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Hardik_Pandya_2023.jpg",
    },
    {
        email: "ravindra.jadeja@example.com",
        fullname: "Ravindra Jadeja",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Ravindra_Jadeja_2023.jpg",
    },
    {
        email: "jasprit.bumrah@example.com",
        fullname: "Jasprit Bumrah",
        password: "123456",
        profilePic: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Jasprit_Bumrah_2023.jpg",
    },
];


const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Call the function
seedDatabase();