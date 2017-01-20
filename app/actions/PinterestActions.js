import request from "axios"

const PINTEREST_GET_BOARDS = "https://api.pinterest.com/v1/me/boards/?access_token=AaCoj06s6hUWaTmVBbOO_pPJeJvCFFcuL81B315DJRaAVYAsoQAAAAA&fields=id%2Cname%2Curl%2Cdescription%2Ccounts%2Cimage%2Cprivacy%2Ccreated_at"
const PINTEREST_GET_PINS = "https://api.pinterest.com/v1/boards/:board/pins/?access_token=AUZmwSnKE_mVt_JFrIUsoCwxjb_BFFcuUptkvLBDJRaAVYAsoQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cattribution%2Ccolor%2Cboard%2Ccounts%2Ccreated_at%2Ccreator%2Cimage%2Cmedia%2Cmetadata%2Coriginal_link"

export function getBoards() {
  return {
    type: 'GET_BOARDS',
    promise: request.get(PINTEREST_GET_BOARDS)
  }
}

export function getPins(params) {
  return {
    type: 'GET_PINS',
    promise: request.get(PINTEREST_GET_PINS.replace(/\:board/, params.id))
  }	
}
