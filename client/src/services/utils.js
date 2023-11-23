import celesteBg from '../assets/celestebg.png';
import leagueoflegendsbg from '../assets/leagueoflegends.webp';
import minecraftBg from '../assets/minecraftbg.jpeg';
import rocketLeagueBg from '../assets/rocketleague.jpeg';
import smashBg from '../assets/smashbg.png';
import valorantBg from '../assets/valorant.webp';

export const getGameBackground = (game) => {
    switch (game) {
        case 'League of Legends':
            return leagueoflegendsbg;
        case 'Valorant':
            return valorantBg;
        case 'Minecraft':
            return minecraftBg;
        case 'Rocket League':
            return rocketLeagueBg;
        case 'Smash Bros Ultimate':
            return smashBg;
        case 'Celeste':
            return celesteBg;
        default:
            return valorantBg;
    }
}