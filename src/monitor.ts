import dotenv from 'dotenv';

import { getDelegator } from './delegator';
import { getGuardian } from './guardian';
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toConsole(x:any){ return JSON.stringify(x, null, 2)}

async function x() {
    const ethereumEndpoint = String("https://mainnet.infura.io/v3/254e62772dc84f7abca6251cfce01798");
    const nodeEndpoints = [
        'https://0xcore.orbs.com/services/management-service/status',  // for actual production front-end with https
        'http://0xaudit.orbs.com/services/management-service/status', // for dev non https
        'http://13.209.195.145/services/management-service/status',  // for dev non https
    ];
    const guardianAddress = String("0x9520f53fd81c668e8088ae194c40e3f977b73d28");
    const delegatorAddress = String("0xae4e8fcbd07459789d6126b1917746d66db7ea0c");

    const guardianInfo = await getGuardian(guardianAddress, ethereumEndpoint);

    const guardianState = {
        total_stake : guardianInfo.stake_status.total_stake,
        self_stake : guardianInfo.stake_status.self_stake,
        delegated_stake : guardianInfo.stake_status.delegated_stake,
        total_rewards : guardianInfo.reward_status.total_guardian_rewards
    };

    const delegatorInfo = await getDelegator(delegatorAddress, ethereumEndpoint);

    let  delegatorState = {
        total_stake : delegatorInfo.total_stake,
        total_rewards : delegatorInfo.total_rewards
    };

    let result = String("[NEOPLY Guardian]\\n");
    result = result.concat("Address : ", guardianAddress, "\\n");
    result = result.concat("Total Staking : ", guardianState.total_stake.toString(), " Orbs\\n");
    result = result.concat("Self Staking : ", guardianState.self_stake.toString(), " Orbs\\n");
    result = result.concat("Delegated Staking : ", guardianState.delegated_stake.toString(), " Orbs\\n");
    result = result.concat("Guardian Total Rewards : ", guardianState.total_rewards.toString(), " Orbs\\n");
    result = result.concat("\\n[BT Delegator]\\n");
    result = result.concat("Address : ", delegatorAddress, "\\n");
    result = result.concat("Total Staking : ", delegatorState.total_stake.toString(), " Orbs\\n");
    result = result.concat("Delegator Total Rewards : ", delegatorState.total_rewards.toString(), " Orbs\\n");
    result = result.concat("\\nReport String : ", delegatorState.total_rewards.toString(), " ", guardianState.total_rewards.toString());
    
    console.log(result);
}

x().then(()=> process.exit(0)).catch(/*e => console.log(`${e.stack}`)*/);

