import UserModel from 'database/models/user.model.js';

export async function isLoggedIn (ctx,next){
	if (ctx.isAuthenticated()){
		const User = await UserModel.findById(ctx.state.user._id);
		ctx.state.initial = Object.assign({}, ctx.state.intial || {} , { User })
	}
	return next();
}