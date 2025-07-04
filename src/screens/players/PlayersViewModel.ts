import { Player } from '../../models/Player';
import { PlayerService } from '../../services/PlayerService';

export class PlayersViewModel {
    private playerService: PlayerService;
    private currentTag: string = "";
    private player: Player = this.createEmptyPlayer();
    private isLoading: boolean = false;
    private error: string | null = null;

    constructor(playerService?: PlayerService) {
        this.playerService = playerService || new PlayerService();
    }

    createEmptyPlayer(): Player {
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

    private validateTag(tag: string): boolean {
        const cleanTag = tag.trim().replace('#', '');
        return cleanTag.length > 0;
    }

    setCurrentTag(tag: string): void {
        this.currentTag = tag.trim().replace('#', '');
    }

    async searchPlayer(): Promise<void> {
        if (!this.validateTag(this.currentTag)) {
            this.error = "Por favor ingresa un tag válido";
            return;
        }

        this.isLoading = true;
        this.error = null;

        try {
            this.player = await this.playerService.getPlayer(this.currentTag);
        } catch (error) {
            console.error('Error loading player:', error);
            this.error = `No se pudo cargar el jugador con tag ${this.currentTag}`;
            this.player = this.createEmptyPlayer();
        } finally {
            this.isLoading = false;
        }
    }

    getPlayer(): Player {
        return this.player;
    }

    getLoadingState(): boolean {
        return this.isLoading;
    }

    getError(): string | null {
        return this.error;
    }

    getCurrentTag(): string {
        return this.currentTag;
    }
}