import { readdir, readJson } from 'fs-extra'
import { Sonolus } from 'sonolus-express'

export const levelsPath = './levels'

const perPage = 20

export function installUploadedLevels(sonolus: Sonolus): void {
    sonolus.serverInfoHandler = async (sonolus) => {
        // returns 5 entries of each item type to show on server home page
        return {
            levels: (await getLevels(0, 5)).levels,
            skins: sonolus.db.skins.slice(0, 5),
            backgrounds: sonolus.db.backgrounds.slice(0, 5),
            effects: sonolus.db.effects.slice(0, 5),
            particles: sonolus.db.particles.slice(0, 5),
            engines: sonolus.db.engines.slice(0, 5),
        }
    }

    sonolus.levelListHandler = async (sonolus, keywords, page) => {
        // for demo purpose, we are ignoring search and simply do pagination
        const result = await getLevels(page * perPage, perPage)

        return {
            pageCount: Math.ceil(result.count / perPage),
            infos: result.levels,
        }
    }

    sonolus.levelDetailsHandler = async (sonolus, name) => {
        // for demo purpose, no recommendation is given
        const level = await getLevel(name)

        return {
            info: level,
            description: level.description,
            recommended: [],
        }
    }

    sonolus.app.get('/levels/:name/cover', (req, res) => {
        res.sendFile(`${levelsPath}/${req.params.name}/cover`, { root: '.' })
    })

    sonolus.app.get('/levels/:name/bgm', (req, res) => {
        res.sendFile(`${levelsPath}/${req.params.name}/bgm`, { root: '.' })
    })

    sonolus.app.get('/levels/:name/data', (req, res) => {
        res.sendFile(`${levelsPath}/${req.params.name}/data`, { root: '.' })
    })
}

async function getLevels(offset: number, limit: number) {
    // implement search and pagination here, typically fetch from a database
    // for demo purpose, we are ignoring search and simply do pagination
    const levelNames = sortLevelsByName(await readdir(levelsPath))

    return {
        count: levelNames.length,
        levels: await Promise.all(
            levelNames.slice(offset, offset + limit).map(getLevel)
        ),
    }
}

async function getLevel(name: string) {
    return {
        name,
        ...(await readJson(`${levelsPath}/${name}/info`)),
        // using URL only SRL for dynamic access
        // ideally you should compute hashes during upload and provide them here
        cover: {
            type: 'LevelCover',
            hash: '',
            url: `/levels/${name}/cover`,
        },
        bgm: {
            type: 'LevelBgm',
            hash: '',
            url: `/levels/${name}/bgm`,
        },
        data: {
            type: 'LevelData',
            hash: '',
            url: `/levels/${name}/data`,
        },
    }
}

function sortLevelsByName(names: string[]) {
    return names.sort((a, b) => b.localeCompare(a))
}
