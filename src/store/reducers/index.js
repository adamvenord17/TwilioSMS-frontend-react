import { combineReducers } from 'redux';

import CommonReducer from './common/common.jsx';
import AuthReducer from './auth/auth.jsx';
import UserReducer from './user/user.jsx';
import SMSReducer from './sms/sms.jsx';

const rootReducer = combineReducers({
	common: CommonReducer,
	auth: AuthReducer,
	user: UserReducer,
	sms: SMSReducer
})

export default rootReducer