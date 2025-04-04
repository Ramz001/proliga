import { PLAYER_POSITION} from 'app/utils/player.util'
import { toast } from 'react-toastify'

export const swapTeamPlayerReducer = (state, action) => {
  const {
    player,
    team,
    previousPlayer,
    t,
    transfer_show_modals,
    max_same_team_players,
  } = action.payload
  const maxTeamPlayers = team.transfers_from_one_team ?? 2

  const evaluateTeamClubId = () => {
    state.duplicatesMap = {}
    const newTeam = [...state.GOA, ...state.DEF, ...state.MID, ...state.STR]

    newTeam.forEach((player) => {
      const clubSlug = player?.club_id?.id ?? ''

      if (player.name) {
        state.duplicatesMap[clubSlug] = (state.duplicatesMap[clubSlug] || 0) + 1
      }
    })
  }

  const calcTeamPrice = () => {
    state.teamPrice =
      state.GOA.reduce((acc, player) => acc + player.price, 0) +
      state.DEF.reduce((acc, player) => acc + player.price, 0) +
      state.MID.reduce((acc, player) => acc + player.price, 0) +
      state.STR.reduce((acc, player) => acc + player.price, 0)
  }

  const createUpdatedPlayer = (prevPlayer, newPlayer) => ({
    ...prevPlayer,
    id: prevPlayer.id,
    club_id: {
      slug: newPlayer.club.slug,
      id: newPlayer.club.id,
    },
    name: newPlayer.name,
    position: newPlayer.position,
    player_id: newPlayer.id,
    price: newPlayer.price,
    competition_id: team.competition_id.id,
    user_id: team.user_id,
    image: newPlayer.image,
    percentage: newPlayer.percentage ?? null,
    player: {
      name: newPlayer.name,
      name_ru: newPlayer.name_ru,
    },
  })

  const clubId = player.club.id || player.club_id.id

  if (state.duplicatesMap[clubId] === max_same_team_players) {
    toast.warning(t('Max players count reached from the same club!'), {
      theme: 'dark',
    })
    state.transferModal = false
    return state
  }
  if (state.duplicatesMap[clubId] > maxTeamPlayers - 1) {
    toast.warning(
      t("Ushbu klubdan $ ta oyinchi qo'shib bo'lmaydi!").replace(
        '$',
        maxTeamPlayers
      ),
      { theme: 'dark' }
    )
    state.transferModal = false
    state.clubModal = transfer_show_modals
    return state
  }

  if (state.GOA.length > 0 && player.position === PLAYER_POSITION.GOA) {
    const prevPlayer = state.GOA.find((p) => previousPlayer.id === p.player_id)
    const prevPlayerIndex = state.GOA.findIndex(
      (p) => previousPlayer.id === p.player_id
    )
    state.GOA[prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
    evaluateTeamClubId()
    calcTeamPrice()
    state.transferModal = false
    toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"), { theme: 'dark' })
    return state
  }
  if (player.position === PLAYER_POSITION.DEF && state.DEF.length > 0) {
    const prevPlayer = state.DEF.find((p) => previousPlayer.id === p.player_id)
    const prevPlayerIndex = state.DEF.findIndex(
      (p) => previousPlayer.id === p.player_id
    )
    state.DEF[prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
    evaluateTeamClubId()
    calcTeamPrice()
    state.transferModal = false
    toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"), { theme: 'dark' })
    return state
  }
  if (player.position === PLAYER_POSITION.MID && state.MID.length > 0) {
    const prevPlayer = state.MID.find((p) => previousPlayer.id === p.player_id)
    const prevPlayerIndex = state.MID.findIndex(
      (p) => previousPlayer.id === p.player_id
    )
    state.MID[prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
    evaluateTeamClubId()
    calcTeamPrice()
    state.transferModal = false
    toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"), { theme: 'dark' })
    return state
  }
  if (player.position === PLAYER_POSITION.STR && state.STR.length > 0) {
    const prevPlayer = state.STR.find((p) => previousPlayer.id === p.player_id)
    const prevPlayerIndex = state.STR.findIndex(
      (p) => previousPlayer.id === p.player_id
    )
    state.STR[prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
    evaluateTeamClubId()
    calcTeamPrice()
    state.transferModal = false
    toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"), { theme: 'dark' })
    return state
  }
}
