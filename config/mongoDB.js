import { IP_ENV } from './project';

const mongoConfig = {
		mongoURL: `mongodb://${IP_ENV}:27017/rian`, // mongodb for docker
};

export default mongoConfig;