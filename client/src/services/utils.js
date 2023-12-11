import celesteBg from '../assets/celestebg.png';
import leagueoflegendsbg from '../assets/leagueoflegends.webp';
import lecBg from '../assets/lec.jpeg';
import minecraftBg from '../assets/minecraftbg.jpeg';
import rlcsBg from '../assets/rlcs.jpg';
import rocketLeagueBg from '../assets/rocketleague.jpeg';
import smashBg from '../assets/smashbg.png';
import valorantBg from '../assets/valorant.webp';
import vctBg from '../assets/vct.jpg';

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

export const getMatchBackground = (game) => {
    switch (game) {
        case 'League of Legends':
            return lecBg;
        case 'Valorant':
            return vctBg;
        case 'Minecraft':
            return minecraftBg;
        case 'Rocket League':
            return rlcsBg;
        case 'Smash Bros Ultimate':
            return smashBg;
        case 'Celeste':
            return celesteBg;
        default:
            return valorantBg;
    }
}

export const getBase64Image = (image) => {
    if (image === '') return;
    return `data:image/jpeg;base64,${image}`;
}