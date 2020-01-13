import UserModel from '../models/UserModel';

export const isUserAlreadyExistsByLogin = async (login: string): Promise<void> => {
    const user = await UserModel.findOne({ login });
    if(user) {
        return Promise.reject('Пользователь с таким логином уже существует');
    }
};