/**
 * Use this insted of filter(). Perfect for DELETE(ing) stuff (i.e. userGroup).
 * It parses the special ids (userId + Date.now()) then compares the date. Since time will always move forward,
 * the ids will be sorted already.
 * @param specialUserIds 
 * @param specialTargetUserId 
 * @param userId 
 * @returns 
 */

export default function binaryFilter(specialIds: SpecialIds[], targetUser: SpecialIds) {
    const copyArr = [...specialIds]
    const { userId: targetId, specialId: targetSpecial } = targetUser

    let left = 0
    let right = copyArr.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const midUser = copyArr[mid]
        const { userId: midId, specialId: midSpecial } = midUser

        const midDate = +midSpecial.slice(midId.length, midSpecial.length)

        const targetDate = +targetSpecial.slice(targetId.length, targetSpecial.length)

        // Firstly, check if the date even matches
        if (midDate === targetDate) {
            // Then, check if the ids match (CHECK EVERYTHING FOR ASSURANCE)
            if (
                midId === targetId &&
                midSpecial === targetSpecial
            ) {
                copyArr.splice(mid, 1)
                return {
                    newList: copyArr,
                    index: mid
                }
            }
            // The search would be small by then so this is okay
            left = left + 1
        }

        else if (midDate < targetDate) {
            left = mid + 1
        }

        else {
            right = mid - 1
        }
    }
    return void 0
}

// let startDate = new Date(2000, 9, 10)
// let endDate = new Date(2050, 9, 13)
// let userIdExtras = []

// const userA = "649c891b0633b68822bf3681"
// const userB = "649cdac70d107a45960a8091"

// while (startDate <= endDate) {
//     const random = Math.round(Math.random() * 10)
//     const userId = random > 5
//         ? userA
//         : userB

//     let month = startDate.getMonth() + 1
//     let day = startDate.getDate()
//     let year = startDate.getFullYear()

//     let formattedDate = `${month}/${day}/${year}`
//     userIdExtras.push({
//         userId,
//         specialId: userId + +new Date(formattedDate)
//     });

//     startDate.setDate(startDate.getDate() + 1)
// }

// console.time("binary")


// const res = binaryFilter(userIdExtras, targetUserIdExtra, userA)
// if (res) {
//     const { sanityCheck, index } = res
//     console.log(sanityCheck)
//     console.log(index)
// }
// else {
//     console.log('not found')
// }

// console.timeEnd("binary")
