import { useDispatch, useSelector } from 'react-redux'
import AddPlayerButton from './AddPlayerButton'
import {
  addTeamPlayer,
  updateTeamPlayer,
} from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { useTranslation } from 'react-i18next'
import { CONFIG_KEY } from 'app/utils/config.util'
import {
  selectTeamConcat,
  selectTotalPlayersCount,
} from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { cn } from '@/lib/utils'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'

const TransferTableBody = ({ table, flexRender }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const totalPlayersCount = useSelector(selectTotalPlayersCount)
  const teamConcat = useSelector(selectTeamConcat)
  const currentTeam = useSelector(selectCurrentTeam)
  const config = useSelector(selectSystemConfig)
  const { teamPrice } = useSelector((store) => store.teamPlayer)
  const max_same_team_players = +config[CONFIG_KEY.max_same_team_players]?.value
  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'
  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)

  const handleAddPlayer = (player) => {
    if (currentTeam?.is_team_created) {
      dispatch(
        addTeamPlayer({
          player,
          team: currentTeam,
          teamConcat,
          t,
          max_same_team_players,
          transfer_show_modals,
        })
      )
    } else {
      dispatch(
        updateTeamPlayer({
          player,
          team: currentTeam,
          teamConcat,
          t,
          max_same_team_players,
          transfer_show_modals,
        })
      )
    }
  }

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="mx-auto border-b border-neutral-700 bg-neutral-950 odd:bg-neutral-900 hover:bg-black"
        >
          {row.getVisibleCells().map((cell) => (
            <td
              className={cn(
                'px-0 text-center text-[10px] capitalize xs:text-xs sm:text-start',
                'md:p-1 md:text-sm lg:text-xs xl:text-sm',
                cell.column.id === 'name' ? 'min-w-1/4' : 'w-min sm:w-auto'
              )}
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
          {row
            .getVisibleCells()
            .map(
              (cell) =>
                cell.column.id === 'name' && (
                  <AddPlayerButton
                    teamBalance={teamBalance}
                    key={cell.id}
                    cell={cell}
                    teamConcat={teamConcat}
                    handleAddPlayer={handleAddPlayer}
                    totalPlayersCount={totalPlayersCount}
                  />
                )
            )}
        </tr>
      ))}
    </tbody>
  )
}

export default TransferTableBody
