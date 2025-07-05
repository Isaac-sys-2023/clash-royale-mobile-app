import { BattleLog, BattlePlayerLog } from '@/src/models/BattlePlayerLog';
import { Badge, Player } from '../../models/Player';
import { PlayerService } from '../../services/PlayerService';
import { Card } from '@/src/models/Card';
import { CardsViewModel } from '../cards/CardsViewModel';

export class PlayersViewModel {
    private playerService: PlayerService;
    private currentTag: string = "";
    private player: Player = this.createEmptyPlayer();
    private battlelog: BattlePlayerLog = this.createEmptyPlayerBattleLog();
    private isLoading: boolean = false;
    private error: string | null = null;

    private currentBattlePage = 0;
    private currentBadgePage = 0;
    private readonly BATTLES_PER_PAGE = 5;
    private readonly BADGES_PER_PAGE = 10;

    private cardsViewModel: CardsViewModel;
    private allCards: Card[] = [];
    private allSupportCards: Card[] = [];

    constructor(playerService?: PlayerService, /**/cardsViewModel?: CardsViewModel) {
        this.playerService = playerService || new PlayerService();
        this.cardsViewModel = cardsViewModel || new CardsViewModel();
    }

    async loadAllCards(): Promise<void> {
        await this.cardsViewModel.loadAllCards();
        this.cardsViewModel.setFilter('all');
        const { cards, supportCards } = this.cardsViewModel.getFilteredCards();
        console.log(cards);
        console.log(supportCards);
        this.allCards = cards;
        this.allSupportCards = supportCards;
    }

    getMissingCards(): { cards: Card[], supportCards: Card[] } {
        const unlockedCardIds = this.player.cards.map(c => c.id);
        const unlockedSupportCardIds = this.player.supportCards.map(sc => sc.id);

        const missingCards = this.allCards.filter(card => 
            !unlockedCardIds.includes(card.id))
            .map(card => ({ 
                ...card, 
                isMissing: true 
            }));

        const missingSupportCards = this.allSupportCards.filter(supportCard => 
            !unlockedSupportCardIds.includes(supportCard.id))
            .map(supportCard => ({
                ...supportCard,
                isMissing: true
            }));

        return {
            cards: missingCards,
            supportCards: missingSupportCards
        };
    }

    getUnlockStats(): { 
        cards: { unlocked: number, total: number }, 
        supportCards: { unlocked: number, total: number } 
    } {
        return {
            cards: {
                unlocked: this.player.cards.length,
                total: this.allCards.length
            },
            supportCards: {
                unlocked: this.player.supportCards.length,
                total: this.allSupportCards.length
            }
        };
    }

    createEmptyPlayerBattleLog(): BattlePlayerLog {
        return {
            battles: []
        };
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
            await this.loadAllCards();
            this.player = await this.playerService.getPlayer(this.currentTag);
            this.battlelog = await this.playerService.getBattlePlayerLog(this.currentTag);
        } catch (error) {
            console.error('Error loading player:', error);
            this.error = `No se pudo cargar el jugador con tag ${this.currentTag}`;
            this.player = this.createEmptyPlayer();
            this.battlelog = this.createEmptyPlayerBattleLog();
        } finally {
            this.isLoading = false;
        }
    }

    getPlayer(): Player {
        return this.player;
    }

    getPlayerBattleLog(): BattlePlayerLog {
        return this.battlelog;
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

    formatBattleTime(battleTime: string): string {
        const year = battleTime.substring(0, 4);
        const month = battleTime.substring(4, 6);
        const day = battleTime.substring(6, 8);
        const time = battleTime.substring(9, 15); // "155749"

        const hours = time.substring(0, 2);
        const minutes = time.substring(2, 4);

        const isoFormatted = `${year}-${month}-${day} ${hours}:${minutes}`;
        return isoFormatted;
    }

    formatLevel(level: number, rarity: string): number {
        if (rarity === 'rare') {
            return level + 2;
        } else if (rarity === 'epic') {
            return level + 5;
        } else if (rarity === 'legendary') {
            return level + 8;
        } else if (rarity === 'champion') {
            return level + 10;
        }
        return level;
    }

    getPaginatedBattles(): BattleLog[] {
        const start = this.currentBattlePage * this.BATTLES_PER_PAGE;
        return this.battlelog.battles.slice(start, start + this.BATTLES_PER_PAGE);
    }

    getPaginatedBadges(): Badge[] {
        const start = this.currentBadgePage * this.BADGES_PER_PAGE;
        return this.player.badges.slice(start, start + this.BADGES_PER_PAGE);
    }

    hasMoreBattles(): boolean {
        return (this.currentBattlePage + 1) * this.BATTLES_PER_PAGE < this.battlelog.battles.length;
    }

    hasMoreBadges(): boolean {
        return (this.currentBadgePage + 1) * this.BADGES_PER_PAGE < this.player.badges.length;
    }

    loadMoreBattles(): void {
        if (this.hasMoreBattles()) {
            this.currentBattlePage++;
        }
    }

    loadMoreBadges(): void {
        if (this.hasMoreBadges()) {
            this.currentBadgePage++;
        }
    }

    hasPrevBattles(): boolean {
        return this.currentBattlePage > 0;
    }

    hasPrevBadges(): boolean {
        return this.currentBadgePage > 0;
    }

    loadPrevBattles(): void {
        if (this.hasPrevBattles()) {
            this.currentBattlePage--;
        }
    }

    loadPrevBadges(): void {
        if (this.hasMoreBadges()) {
            this.currentBadgePage--;
        }
    }

    getCurrentBattleRange(): string {
        const start = this.currentBattlePage * this.BATTLES_PER_PAGE + 1;
        const end = Math.min(
            (this.currentBattlePage + 1) * this.BATTLES_PER_PAGE,
            this.battlelog.battles.length
        );
        return `${start}-${end} de ${this.battlelog.battles.length}`;
    }

    getCurrentBadgeRange(): string {
        const start = this.currentBadgePage * this.BADGES_PER_PAGE + 1;
        const end = Math.min(
            (this.currentBadgePage + 1) * this.BADGES_PER_PAGE,
            this.player.badges.length
        );
        return `${start}-${end} de ${this.player.badges.length}`;
    }

    resetPagination(): void {
        this.currentBattlePage = 0;
        this.currentBadgePage = 0;
    }

    
}