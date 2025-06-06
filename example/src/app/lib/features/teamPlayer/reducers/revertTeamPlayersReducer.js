import { PLAYER_POSITION } from 'app/utils/player.util'

export const revertTeamPlayersReducer = (state) => {
  state.GOA = []
  state.DEF = []
  state.MID = []
  state.STR = []
  state.playersCount = {
    GOA: 0,
    DEF: 0,
    MID: 0,
    STR: 0,
  }
  state.teamPrice = 0
  state.duplicatesMap = {}

  const team = state.prevTeam
  team?.length > 0 &&
    team.forEach((player) => {
      const clubSlug = player?.club_id?.id ?? ''

      if (player.position === PLAYER_POSITION.GOA) {
        state.GOA.push(player)
        if (player.name) {
          state.playersCount.GOA++
          state.duplicatesMap[clubSlug] =
            (state.duplicatesMap[clubSlug] || 0) + 1
        }
      }
      if (player.position === PLAYER_POSITION.DEF) {
        state.DEF.push(player)
        if (player.name) {
          state.playersCount.DEF++
          state.duplicatesMap[clubSlug] =
            (state.duplicatesMap[clubSlug] || 0) + 1
        }
      }
      if (player.position === PLAYER_POSITION.MID) {
        state.MID.push(player)
        if (player.name) {
          state.playersCount.MID++
          state.duplicatesMap[clubSlug] =
            (state.duplicatesMap[clubSlug] || 0) + 1
        }
      }
      if (player.position === PLAYER_POSITION.STR) {
        state.STR.push(player)
        if (player.name) {
          state.playersCount.STR++
          state.duplicatesMap[clubSlug] =
            (state.duplicatesMap[clubSlug] || 0) + 1
        }
      }
    })

  state.teamPrice =
    state.GOA.reduce((acc, player) => acc + player.price, 0) +
    state.DEF.reduce((acc, player) => acc + player.price, 0) +
    state.MID.reduce((acc, player) => acc + player.price, 0) +
    state.STR.reduce((acc, player) => acc + player.price, 0)
}
