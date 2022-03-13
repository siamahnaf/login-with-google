const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Model
const { User } = require("../Model/userModel");


module.exports = {
    Query: {
        greeting: () => {
            return "Hello World"
        }
    },
    Mutation: {
        googleAuth: async (_, { idToken }) => {
            const clientId = process.env.GOOGLE_CLIENT_ID;
            const { payload } = await client.verifyIdToken({ idToken: idToken, audience: clientId });
            if (payload.email_verified) {
                const user = await User.findOne({
                    email: payload.email
                });
                if (!user) {
                    const newUser = new User({
                        name: payload.name,
                        email: payload.email,
                        avatar: payload.picture,
                        provider: payload.iss,
                        providerId: payload.sub
                    });
                    await newUser.save();
                    return {
                        message: "Login Successfull",
                        success: true
                    }
                } else {
                    return {
                        message: "Login Successfull",
                        success: true
                    }
                }
            } else {
                return {
                    message: "Login Unsuccessfull",
                    success: false
                }
            }
        }
    }
}