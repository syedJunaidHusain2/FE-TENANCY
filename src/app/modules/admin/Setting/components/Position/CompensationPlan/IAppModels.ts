export interface IAppBasic {
    commission_parentage: string
    commission_structure_type: string
    appType: 'Quick Online Courses' | 'Face to Face Discussions' | 'Full Intro Training'
}

export type TAppFramework = 'HTML5' | 'ReactJS' | 'Angular' | 'Vue'

export interface IAppDatabase {
    databaseName: string
    databaseSolution: 'MySQL' | 'Firebase' | 'DynamoDB'
}

export type TAppStorage = 'Basic Server' | 'AWS' | 'Google'

export interface ICreateAppData {
    appBasic: IAppBasic
    appFramework: TAppFramework
    appDatabase: IAppDatabase
    appStorage: TAppStorage
}

export const defaultCreateAppData: ICreateAppData = {
    appBasic: {
        commission_parentage: '',
        commission_structure_type: '',
        appType: 'Quick Online Courses',
    },
    appFramework: 'HTML5',
    appDatabase: {databaseName: 'db_name', databaseSolution: 'MySQL'},
    appStorage: 'Basic Server',
}

export type StepProps = {
    data: ICreateAppData
    updateData: (fieldsToUpdate: Partial<ICreateAppData>) => void
    hasError: boolean
}
