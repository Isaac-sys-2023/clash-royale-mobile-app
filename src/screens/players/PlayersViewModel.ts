import { Player } from '../../models/Player';
import { PlayerService } from '../../services/PlayerService';

export class PlayersViewModel {
  private playerService: PlayerService;
  private currentTag: string = "";
  private player: Player = this.createEmptyPlayer();
  
  constructor() {
    this.playerService = new PlayerService();
  }

  private createEmptyPlayer(): Player {
    return {
      tag: '',
      name: '',
      expLevel: 0,
      trophies: 0,
      bestTrophies: 0,
      wins: 0,
      losses: 0,
      battleCount: 0,
      threeCrownWins: 0,
      challengeCardsWon: 0,
      challengeMaxWins: 0,
      tournamentCardsWon: 0,
      tournamentBattleCount: 0,
      role: '',
      donations: 0,
      donationsReceived: 0,
      totalDonations: 0,
      warDayWins: 0,
      clanCardsCollected: 0,
      clan: {
        tag: '',
        name: '',
        badgeId: 0
      },
      arena: {
        id: 0,
        name: ''
      },
      leagueStatistics: {
        currentSeason: {
          trophies: 0
        },
        previousSeason: {
          trophies: 0
        },
        bestSeason: {
          trophies: 0
        }
      },
      badges: [],
      achievements: [],
      cards: [],
      supportCards: [],
      currentDeck: [],
      currentDeckSupportCards: [],
      currentFavouriteCard: {
        name: '',
        id: 0,
        maxLevel: 0,
        iconUrls: {
          medium: ''
        },
        rarity: 'common'
      },
      starPoints: 0,
      expPoints: 0,
      legacyTrophyRoadHighScore: 0,
      currentPathOfLegendSeasonResult: {
        leagueNumber: 0,
        trophies: 0,
        rank: 0
      },
      lastPathOfLegendSeasonResult: {
        leagueNumber: 0,
        trophies: 0,
        rank: 0
      },
      bestPathOfLegendSeasonResult: {
        leagueNumber: 0,
        trophies: 0,
        rank: 0
      },
      progress: {},
      totalExpPoints: 0
    };
  }

  setCurrentTag(tag:string): void {
    this.currentTag = tag;
  }

  async loadPlayer(): Promise<void> {
    if(this.currentTag === ""){
        return
    }
    this.player = await this.playerService.getPlayer(this.currentTag);
  }
}