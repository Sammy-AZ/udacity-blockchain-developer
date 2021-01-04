import 'package:flutter/material.dart';
import 'package:flutter_dapp/contract/account_store.dart';
import 'package:flutter_dapp/contract/contract_service.dart';
import 'package:flutter_dapp/contract/contract_store.dart';
import 'package:flutter_dapp/contract/prerequisites.dart';
import 'package:flutter_dapp/utility/app_constants.dart';
import 'package:provider/provider.dart';

import 'components/main_page.dart';

final App appConstants = App.settings;
ContractService contractService;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Prerequisites prerequisites = Prerequisites();
  await prerequisites.initializationDone;
  contractService = ContractService();
  runApp(FlightSuretyApp());
}

class FlightSuretyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider(
          create: (_) => AccountStore(contractService),
        ),
        ProxyProvider<AccountStore, ContractStore>(
            update: (_, account, __) => ContractStore(account))
      ],
      child: MaterialApp(
        title: appConstants.appBarTitleText,
        theme: appConstants.theme,
        home: Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                  image: appConstants.backgroundImage, fit: BoxFit.cover),
            ),
            child: MainPage(title: appConstants.appBarTitleText)),
      ),
    );
  }
}
