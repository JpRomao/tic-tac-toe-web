export interface ErrorProps {
  code: number;
  message: string;
}

export const errors = {
  player: {
    alreadyExists: {
      message: "Player already exists",
      code: 400,
    },
    notFind: {
      message: "Room not find",
      code: 400,
    },
  },
  room: {
    alreadyExists: {
      message: "Room already exists",
      code: 400,
    },
    notFind: {
      message: "Room not find",
      code: 400,
    },
    isFull: {
      message: "Room is full",
      code: 400,
    },
  },
  board: {
    notFind: {
      message: "Room not find",
      code: 400,
    },
  },
};
